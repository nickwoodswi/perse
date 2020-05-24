![PERSE Screen Shot](https://github.com/nickwoodswi/perse/blob/master/src/images/ScreenShot.png)

PERSE is a simple workout assignment and editor app for coaches, personal trainers, and athletes. Select workouts from those already in the database, and assign them to an existing athlete (or create a new athlete) on a single date or over a date range, with options to select recurrance every day, every other day, every third day, or every week.

Create new exercises from scratch by naming a new exercise type and setting intensity by rep type, weight, distance, rest, and tempo, or select from existing exercise types already in the system. Then, either add them to an existing workout, or build a new workout from scratch before assigning. 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It also makes use of Express, PostgreSQL, and Node.js. It was deployed to Vercel, and Heroku.

## DEMO: https://perse.now.sh/

## API Summary

PERSE uses a simple RESTful API architecture supporting GET and POST operations, with a data structure according to the following endpoints:

  /assignments
    {
      id,
      date_assigned,
      perform_on_date,
      athletes_id,
      workouts_id
    }

  /athletes
    {
      athletes_id,
      first_name,
      last_name
    }

  /exercise-types
    {
      exercise_types_id,
      exercise_types_name
    }

  /exercises
    {
      exercises_id,
      exercise_types_id,
      rep_type,
      reps,
      resistance,
      sub_distance,
      tempo,
      subrest,
      rest,
      set_name,
      set_order
    }

  /assignments
    {
      id,
      date_assigned,
      perform_on_date,
      athletes_id,
      workouts_id
    }

  /join
    {
      id,
      workouts_id,
      exercises_id
    }

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
