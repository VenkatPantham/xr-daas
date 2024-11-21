# Setting Up a Flask App on AWS EC2 with HTTPS

This guide explains how to deploy a Flask application on an AWS EC2 instance using **Gunicorn**, **Nginx**, and **Let's Encrypt** for HTTPS configuration. The configuration leverages the `nip.io` wildcard DNS for SSL certificates without requiring a custom domain.

---

## Prerequisites

- AWS EC2 instance running Ubuntu 24.04 or later.
- SSH access to the EC2 instance.
- Public IP address of the EC2 instance.
- Basic knowledge of Linux commands.

For more details, refer to this [Flask on AWS EC2 Guide](https://github.com/yeshwanthlm/YouTube/blob/main/flask-on-aws-ec2.md).

---

## Steps

### 1. Update and Install Required Packages

Update the system and install required dependencies:

```bash
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install python3-venv nginx certbot python3-certbot-nginx -y
```

---

### 2. Set Up the Python Virtual Environment

```bash
python -m venv .venv
source .venv/bin/activate
```

---

### 3. Install Python Dependencies

Install the dependencies for the Flask app:

```bash
pip install -r requirements.txt
pip install gunicorn
```

---

### 4. Configure Gunicorn as a Systemd Service

Create a `backend.service` file:

```bash
sudo vi /etc/systemd/system/backend.service
```

Add the following content:

```ini
[Unit]
Description=Gunicorn instance for the xr-daas-backend app
After=network.target

[Service]
User=ubuntu
Group=www-data
WorkingDirectory=/home/ubuntu/xr-daas-backend
ExecStart=/home/ubuntu/xr-daas-backend/.venv/bin/gunicorn -b localhost:8000 run:app
Restart=always

[Install]
WantedBy=multi-user.target
```

Reload and start the service:

```bash
sudo systemctl daemon-reload
sudo systemctl start backend
sudo systemctl enable backend
```

---

### 5. Configure Nginx

Edit the Nginx configuration file:

```bash
sudo vi /etc/nginx/sites-available/default
```

At the top of the Nginx configuration file (below the default comments), add the following code:

```
upstream backend {
    server 127.0.0.1:8000;
}
```

Update the configuration for the location. Add the following code:

```
server {
    location {
        proxy_pass http://backend;
    }
}
```

Replace `instance_ip` with your EC2 public IP.

Restart Nginx to apply the changes:

```bash
sudo systemctl restart nginx
```

---

### 6. Configure HTTPS with Let's Encrypt

Generate an SSL certificate using `nip.io`:

```bash
sudo certbot --nginx -d instance_ip.nip.io
```

Replace `instance_ip` with your EC2 public IP.

---

### 7. Automate SSL Certificate Renewal

Edit the root user's crontab:

```bash
sudo crontab -e
```

Add this line:

```bash
0 0 * * * certbot renew --quiet && systemctl reload nginx
```

This ensures certificates are renewed daily, if necessary.

---

### Final Steps

Restart Nginx to ensure all configurations are active:

```bash
sudo systemctl restart nginx
```

Access your application securely at:

```
https://<instance_ip>.nip.io
```

---

## Troubleshooting

- **CORS Issues:** Use `Flask-CORS` to configure CORS in your Flask app if your frontend is hosted on a different domain.
- **Firewall Rules:** Ensure ports 80 (HTTP) and 443 (HTTPS) are open in the AWS security group.
- **Logs for Debugging:**
  - Gunicorn logs: `sudo journalctl -u backend`
  - Nginx logs: `sudo tail -f /var/log/nginx/error.log`

---
