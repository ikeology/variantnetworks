# VariantNetworks

VariantNetworks is a community-driven project to create a resilient, decentralized network using low-power Raspberry Pi devices. This repository contains both the website and the Raspberry Pi configuration files necessary to deploy a mesh-based network.

---

## 📁 Project Structure

variantnetworks/
├── website/ # Frontend documents - HTML/CSS/JS files
├── pi-configs/ # Raspberry Pi setup scripts and configuration docs
├── README.md # This file

---

The pi-configs/ folder holds everything needed to configure a Raspberry Pi as part of the mesh network.

Included:

- README.md: Documentation and setup instructions
- setup.sh: Initial provisioning script
- Config examples for wpa_supplicant.conf, dhcpcd.conf, etc.

Planned features:

- Prebuilt SD card images
- Automation scripts
- Role-based configuration (gateway node, repeater node, etc.)
