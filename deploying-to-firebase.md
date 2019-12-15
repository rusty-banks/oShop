* Build the app
ng build --prod

* If using angular7-data-table, use the following command to avoid errors-
ng b --prod --aot=false --build-optimizer=false
OR
change 'private resizeColumnStart' to 'resizeColumnStart' in C:\oshop\node_modules\angular7-data-table\components\table\table.component.d.ts
AND
(not sure)
in
(no idea)

* First install firebase tool, globally
npm i -g firebase-tools

* Login to FB
firebase login

* Initialize FB (if not previously)
firebase init

* Configure firebase.json (if not previously)

* Deploy to FB
firebase deploy