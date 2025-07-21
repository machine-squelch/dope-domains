# Digital Ocean Deployment Guide for dopedomains.com

## Prerequisites

1. Digital Ocean account
2. Domain name (dopedomains.com) pointed to your Digital Ocean droplet
3. Basic knowledge of SSH and command line

## Option 1: Digital Ocean App Platform (Recommended - Easiest)

### Step 1: Prepare Repository
1. Upload your project to GitHub/GitLab
2. Ensure the `dist` folder is included in your repository

### Step 2: Create App on Digital Ocean
1. Go to Digital Ocean App Platform
2. Click "Create App"
3. Connect your GitHub/GitLab repository
4. Select the repository containing your dopedomains project

### Step 3: Configure Build Settings
```yaml
name: dopedomains
services:
- name: web
  source_dir: /
  github:
    repo: your-username/dopedomains
    branch: main
  run_command: serve -s dist -l $PORT
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  routes:
  - path: /
```

### Step 4: Environment Variables
Set these in the App Platform dashboard:
- `NODE_ENV=production`

### Step 5: Custom Domain
1. In App Platform, go to Settings > Domains
2. Add your custom domain: dopedomains.com
3. Update your DNS records as instructed

## Option 2: Digital Ocean Droplet (More Control)

### Step 1: Create Droplet
1. Create a new Ubuntu 22.04 droplet (minimum $6/month)
2. Add your SSH key
3. Choose a datacenter region close to your target audience

### Step 2: Initial Server Setup
```bash
# Connect to your droplet
ssh root@your_droplet_ip

# Update system
apt update && apt upgrade -y

# Install Docker and Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
apt install docker-compose -y

# Create app directory
mkdir -p /var/www/dopedomains
cd /var/www/dopedomains
```

### Step 3: Upload Your Files
```bash
# On your local machine, upload the built project
scp -r /path/to/premium-domains-marketplace root@your_droplet_ip:/var/www/dopedomains/

# Or clone from repository
git clone https://github.com/your-username/dopedomains.git .
```

### Step 4: Deploy with Docker
```bash
# Build and start the container
docker-compose up -d

# Check if it's running
docker-compose ps
```

### Step 5: Set up Nginx (Optional - for SSL)
```bash
# Install Nginx
apt install nginx -y

# Create Nginx configuration
cat > /etc/nginx/sites-available/dopedomains.com << 'EOF'
server {
    listen 80;
    server_name dopedomains.com www.dopedomains.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Enable the site
ln -s /etc/nginx/sites-available/dopedomains.com /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### Step 6: SSL Certificate with Let's Encrypt
```bash
# Install Certbot
apt install certbot python3-certbot-nginx -y

# Get SSL certificate
certbot --nginx -d dopedomains.com -d www.dopedomains.com

# Test auto-renewal
certbot renew --dry-run
```

## Option 3: Static Site Hosting (Cheapest)

### Digital Ocean Spaces + CDN
1. Create a Digital Ocean Space
2. Enable CDN
3. Upload the `dist` folder contents
4. Configure custom domain

## DNS Configuration

Point your domain to Digital Ocean:
- **A Record**: @ → your_droplet_ip
- **A Record**: www → your_droplet_ip
- **CNAME Record**: www → dopedomains.com (alternative)

## Monitoring and Maintenance

### Health Checks
```bash
# Check if the site is running
curl -I http://your_domain.com

# Check Docker logs
docker-compose logs -f
```

### Updates
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up -d --build
```

## Performance Optimization

1. **Enable Gzip compression** in Nginx
2. **Set up CloudFlare** for additional CDN and security
3. **Monitor with Digital Ocean Monitoring**
4. **Set up automated backups**

## Security Recommendations

1. Set up UFW firewall
2. Disable root SSH login
3. Use SSH keys only
4. Regular security updates
5. Monitor access logs

## Cost Estimation

- **App Platform**: $5-12/month (easiest)
- **Basic Droplet**: $6/month + domain costs
- **Spaces + CDN**: $5/month (static hosting)

## Support

For issues:
1. Check Digital Ocean documentation
2. Review application logs
3. Test locally first
4. Contact Digital Ocean support if needed

## Quick Deploy Commands

```bash
# One-liner for droplet deployment
curl -sSL https://raw.githubusercontent.com/your-repo/dopedomains/main/deploy.sh | bash
```

This deployment guide ensures your dopedomains.com website will be:
- ✅ Fast and reliable
- ✅ SSL secured
- ✅ Scalable
- ✅ Cost-effective
- ✅ Easy to maintain

