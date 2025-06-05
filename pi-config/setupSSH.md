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

Lessons Learned:

- during setup the name of the pi in the imager is important it defines how my mac will identify the server.
- SSH is annoying, but still worth figuring out because it makes the rest of the setup process seamless.
- Connecting my Mac and Pi to my phone hotspot is a good workaround to getting into the pi.
- Little problem cost big time, but its worth figuring out whats wrong now while I have free chatGPT and time to play vs later when these things aren't available.
