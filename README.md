I use CommonJS to debug the code.
the Output should like this.

 Calendar Tests
    ✔ should render February 2028 correctly (29 days in leap year) (133ms)
    ✔ should navigate from December to January and January to December (129ms)
    ✔ should mark specific task dates (57ms)


  3 passing (327ms)


Install Node.js, npm, and mocha

npm install --save-dev chai eslint glob jsdom mocha


vertify if Node.js install correct run node -v and npm list

going to calendarViewTest.js Directory  
Run: npx mocha calendarViewTest.js


if code does not work, try following steps to reintall Dependencies
Ensure there are no duplicate require("chai") or expect declarations.


Install ESLint to catch syntax issues:
npm install eslint --save-dev
npx eslint scripts/tests/calendarViewTest.js

Clear Node.js cache to ensure no old code is interfering:
npm cache clean --force

Delete node_modules and reinstall:

rm -rf node_modules package-lock.json
npm install

Run your test again:
Run: npx mocha calendarViewTest.js

