# Geometry Dash Level Manager
Geometry Dash Level Manager is an open-source tool I created to replace Absolute's version of the tool after RobTop disabled downloads. A few tweaks were added here and there, however the tool is still essentially the same. I didn't bother making a UI for it, so if anyone wants to create a full application with my source code then go ahead.

Changes include:
  - Coins are now automatically changed to secret coins without a prompt.
  - You can now download level data to a text file without injecting it into the game (for those who want to edit it).
  - The tool now allows negative stars and orbs (orbs change with the stars).
  - Level data can now be loaded from a local text file.
  - Patch/Unpatch was removed, this is done automatically now.
  - Biggest of all: Downloading levels by their ID actually works now.

# Requirements
  - A Windows PC
  - Geometry Dash (duh)
  - Node JS installed on your machine

# Bugs and Issues
If you have any issues with the tool doing nothing, consider the following:
  - Did you enter a valid level number in remove/swap/edit?
  - Are you using the correct folder path?
  - Do you have a strong WiFi connection? (only for downloading levels by ID)
  - Did you put in a valid level ID to download?
  - Have you retried the action again or reset the tool?

If all of these are a yes, then there may be issues on my end involving my API for downloading levels. If this is the case, you can expect the tool to work again soon.

# Additional Notes
  - To open the tool, open the file app.bat.
  - All level data you decide to download to a text file with be located in the levels subfolder.
  - To navigate the different menus, press one of the numbers displayed on the screen.
  - If you load any online level data, the color palette won't be saved. To fix this, you can make a copy of the level you want to download and edit in color triggers to recreate the different color channels. Unfortunately, there is no other fix for this.
