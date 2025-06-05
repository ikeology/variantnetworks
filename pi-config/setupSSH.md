````markdown
# Raspberry Pi Setup & SSH Access Guide

## Step 1: Flash the SD Card

Use the Raspberry Pi Imager tool and configure settings:

- **Device:** Pi 3 (or your model)
- **Operating System:** Raspberry Pi OS (64-bit)
- **Storage:** microSD card (~64 GB recommended)

### Edit Settings

**General:**

- Hostname: `raspberrypi.local` (default)
- Set Username: OFF (leave username/password creation disabled for now)
- Configure Wireless LAN:
  - SSID: Your current Wi-Fi network name (e.g., `Rumi_2`)
  - Password: Your Wi-Fi password

**Services:**

- Enable **Allow public-key authentication only**
- Add your public SSH key (to avoid denied access):

### On your Mac

Check your public SSH keys:

```bash
ls ~/.ssh
```
````

Look for your public key file, usually `id_ed25519.pub`, then display it:

```bash
cat ~/.ssh/id_ed25519.pub
```

Copy the full output and paste it into the Services tab in Raspberry Pi Imager, e.g.:

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIDySD2ke+sfaL2EHdXLmWDCr98H2kmGht+Y36YzXNmhy ikeology01123@gmail.com
```

### (MAC TIP) Clean up SSH agents to avoid conflicts:

Check loaded SSH keys:

```bash
ssh-add -l
```

Remove all old keys:

```bash
ssh-add -D
```

Re-add the correct private key:

```bash
ssh-add ~/.ssh/id_ed25519
```

### (MAC TIP) After flashing the SD card

Manually enable SSH by creating an empty `ssh` file in the boot folder of the SD card:

```bash
touch /Volumes/boot/ssh
```

---

## After Flashing the Image on the Pi

### Troubleshooting: Permission Denied (publickey)

Try connecting using these commands (replace IP with your Pi’s IP):

```bash
ssh -i ~/.ssh/id_ed25519 ikeology@raspberrypi.local
```

or

```bash
ssh ikeology@raspberrypi.local
```

or

```bash
ssh ikeology@192.168.1.37
```

---

## Clean up your `.ssh` folder on Mac

If you have too many keys in your `~/.ssh/` folder, it may cause issues. To clean up:

```bash
cd ~/.ssh/
```

To remove old authorized keys:

```bash
rm ~/.ssh/authorized_keys
```

---

**End of guide.**

```

You can copy and paste this directly into VS Code — the fenced triple backticks with `bash` ensure your commands show up as code blocks and are GitHub-friendly. Let me know if you want me to add anything else!
```

Lesson Learned:

- it's worth being able to seamlessly SSH into the pi otherwise you run into issue like not being able to copy and paste into terminal,
  --- you'll need to upload files or folder from some program, and if you cant get into the pi, then it becomes an issue.
  --- my thought is to have a wifi source of truth which will be my iphone wifi for now.
