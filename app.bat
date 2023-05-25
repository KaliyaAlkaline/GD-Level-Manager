@echo off
:mainMenu
title GD Level Editor
cls
if not exist levels md levels
if not exist path.lnk goto setup
call :kill
node check.js
echo Levels:
echo:
node view.js
echo:
echo 1. Add Level
echo 2. Remove Level
echo 3. Swap Levels
echo 4. Edit Level
echo 5. Reset Levels
echo 6. Change Folder Path
echo 7. Exit
echo:
choice /n /c 1234567 /m ^>
if %errorlevel%==1 goto al
if %errorlevel%==2 goto dl
if %errorlevel%==3 goto sl
if %errorlevel%==4 goto el
if %errorlevel%==5 goto rl
if %errorlevel%==6 goto setup
if %errorlevel%==7 exit
goto mainMenu
:al
title Add Level - Name
cls
echo {"prompt":"Level Name: "}>ping_.json
node readline.js
set /p l=<ping_.json
del /q ping_.json
cls
title Add Level - Difficulty
echo Note: Ratings are ranked from 1-6, Easy being 1 and Demon being 6.
echo:
choice /n /c 123456 /m Rating: 
set d=%errorlevel%
cls
title Add Level - Stars
set /p n=Stars: 
cls
title Add Level - Song
echo Note: Songs used for main levels are stored in the Resources folder. If you want to use a custom song, make sure to download it there and use its file name here.
echo:
echo {"prompt":"Song Name: "}>ping_.json
node readline.js
set /p s=<ping_.json
del /q ping_.json
echo {"name":"%l%","difficulty":"%d%","stars":"%n%","song":"%s%"}>ping_.json
call :kill
node add.js
del /q ping_.json
goto mainMenu
:dl
title Remove Level
cls
node view.js
echo:
echo Select a level to remove . . .
echo:
set /p a=Level Number: 
echo ^%a%>ping_.json
call :kill
node remove.js
del /q ping_.json
goto mainMenu
:sl
title Swap Levels
cls
node view.js
echo:
echo Select two levels to swap with each other . . .
echo:
set /p a=Level Number 1: 
set /p b=Level Number 2: 
echo {"l1":%a%,"l2":%b%}>ping_.json
call :kill
node swap.js
del /q ping_.json
goto mainMenu
:rl
title Reset Levels
cls
echo Are you sure you wish to reset all levels? This will remove any level data you have added. (Y/N)
echo:
choice /n /c yn /m ^>
if %errorlevel%==1 goto doit
if %errorlevel%==2 goto mainMenu
goto rl
:doit
cls
call :kill
node reset.js
goto mainMenu
:el
title Edit Level
cls
node view.js
echo:
set /p c=Level Number: 
goto editMenu
:editMenu
title Edit Menu
cls
node view.js
echo:
echo You are currently editing level %c%.
echo:
echo 1. Edit Name
echo 2. Edit Rating
echo 3. Edit Stars
echo 4. Edit Song
echo 5. Add Level Data
echo 6. Back
echo:
choice /n /c 123456 /m ^>
if %errorlevel%==1 goto en
if %errorlevel%==2 goto er
if %errorlevel%==3 goto es
if %errorlevel%==4 goto eg
if %errorlevel%==5 goto ald
if %errorlevel%==6 goto mainMenu
goto editMenu
:en
title Edit Name
cls
echo {"prompt":"Level Name: "}>ping_.json
node readline.js
set /p l=<ping_.json
echo [%c%,"name","%l%"]>ping_.json
call :kill
node edit.js
del /q ping_.json
goto editMenu
:er
title Edit Rating
cls
echo Note: Ratings are ranked from 1-6, Easy being 1 and Demon being 6.
echo:
choice /n /c 123456 /m Rating: 
echo [%c%,"rating",%errorlevel%]>ping_.json
call :kill
node edit.js
del /q ping_.json
goto editMenu
:es
title Edit Stars
cls
set /p n=Stars: 
echo [%c%,"stars","%n%"]>ping_.json
call :kill
node edit.js
del /q ping_.json
goto editMenu
:eg
title Edit Song
cls
echo Note: Songs used for main levels are stored in the Resources folder. If you want to use a custom song, make sure to download it there and use its file name here.
echo:
echo {"prompt":"Song Name: "}>ping_.json
node readline.js
set /p s=<ping_.json
echo [%c%,"song","%s%"]>ping_.json
call :kill
node edit.js
del /q ping_.json
goto editMenu
:ald
title Add Level Data
cls
echo Please choose a method to load the level data . . .
echo:
echo 1. Load by ID
echo 2. Load by TXT
echo 3. Download Level by ID (this will save the data to a text file)
echo 4. Back
echo:
choice /n /c 1234 /m ^>
if %errorlevel%==1 goto id
if %errorlevel%==2 goto txt
if %errorlevel%==3 goto dlid
if %errorlevel%==4 goto editMenu
goto ald
:id
title Load by ID
cls
set /p id=Level ID: 
echo [%c%,"data","id","%id%"]>ping_.json
call :kill
node edit.js
del /q ping_.json
goto ald
:txt
title Load by TXT
cls
set /p txt=Text File (drag it in): 
set txt=%txt:"=%
echo [%c%,"data","txt","%txt:\=/%"]>ping_.json
call :kill
node edit.js
del /q ping_.json
goto ald
:dlid
title Download Level by ID
cls
set /p id=Level ID: 
echo [%c%,"data","dlid","%id%"]>ping_.json
call :kill
node edit.js
del /q ping_.json
goto ald
:setup
cls
set /p p=Path to your Geometry Dash folder (drag it in): 
echo %p:\=/%>path.lnk
goto mainMenu
:kill
taskkill /f /im GeometryDash.exe 2>nul 1>nul
