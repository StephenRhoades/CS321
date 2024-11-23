# CS321 Task Tracker
CS 321 group 2 class project: Task Tracker Chrome Extension.

## This is non-functional currently, but should be how this will be accomplished
- To run this extension, click the green button on the right half with the text "<> code" and then select download zip from the resultant dropdown. 
- You will then want to unzip the folder and ensure that the manifest.json is in the base folder. 
- You can then go to your desired browser and traverse to the manage extensions page by inputing the url "chrome://extensions" into the header. If you are in a browser aside from chrome, this should still work but you can manually replace chrome with the name of your browser if that doesn't happen automatically.
- You will then want to turn on developer mode if it is not already on, and click the option to load unpacked and select your unzipped folder you downloaded.
- The extension should then be among your extensions, running locally.

### Authors:
Evan Bellino,
Joseph Gery,
Bin Jiang,
Nelson Nguyen,
Giancarlo Jaramillo Rojas,
Stephen Rhoades,
David Schmidle

### Testing:
Install Node.js
Install jest: npm install --save-dev jest
Run tests: npx jest --coverage --testMatch "<rootDir>/scripts/tests/**/*Test.js"
