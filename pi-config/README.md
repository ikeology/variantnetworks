# Raspberry Pi Configuration – VariantNetworks

This folder contains setup scripts, configuration files, and documentation for provisioning Raspberry Pi devices to operate as nodes in the VariantNetworks mesh network.

---

## 📦 Contents

- `setup.sh`: Main setup script to install dependencies, configure networking, and prepare the Pi for mesh deployment.
- `wpa_supplicant.conf.example`: Wi-Fi configuration template.
- `hostname-template.txt`: Template for generating consistent device names.
- `notes.md`: Developer notes and configuration history.

---

## 🚀 Quick Start

1. Flash Raspberry Pi OS Lite to your SD card.
2. Copy your Wi-Fi config (optional):
   ```bash
   cp wpa_supplicant.conf.example /Volumes/boot/wpa_supplicant.conf
   ```
