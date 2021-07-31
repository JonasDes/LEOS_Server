
# 👋 Welcome to LEOS-SERVER

## ❗ THIS IS ONLY THE SERVER, YOU'LL NEED THE CLIENT TO RUN ❗

LEOS (Leitstellen -Einsatz und Organisationssystem) is a WebApp for, especially germany, civil protection organisations.

## Features
* Create, Edit and View Operations
  * Autocomplete for adress & POI thanks Google Maps API
  * Get realtime FMS by plugins like Divera
  * Send alerts to mobile devices
  * Generates reports and depesche
* Keep track of your patients
  * External UHS-Modul
  * External MANV-Modul
  * Sort Patients thanks Drag & Drop
* (Radio) -Diary
  * Logs status change and requests to speak automatically
  * Document-proof
* Situation map
  * refrehs automatically the location of units and operaitons

## State
This Project is currently work in progress.
At the Moment i'll refactor the code for domain driven design.
Not all Handlers are already convertet into the controllers. And there are mis

## Actual Folder Structure

```bash
├src
├───application
│   ├───api
│   ├───controller  # where the magic happens
│   ├───plugins     # like Divera or GLS.net
│   └───socket      # handles realtime things
├───assets          # Assets i.a. for the PDF
│   └───fonts       
├───config          # Configs for the Server and WebSocket
├───infrastructure  # Init Stuff for Database, Logger etc.
```
*"Routes"* and  *"Handlers"* are deprecated and will be removed in future versions
