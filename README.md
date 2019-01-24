## Environmental Impact Comparison Between Selected Vehicles

WordPress plugin that displays and compares the environmental impact of various electric and gas vehicles based on Alberta Electric System Operator (AESO) data (<http://ets.aeso.ca/ets_web/ip/Market/Reports/CSDReportServlet>).

### Installation

* Download latest release from <https://github.com/gilyes/env-impact-comparison/releases>
* Upload and activate plugin.
* On the plugin's Settings page upload CSV files containing EV and ICE vehicle data.
  * The format of these CSV files is: vehicle_name, consumption (number), picture_url
  * Do not add header row to CSV.
* Add the shortcode `[env-impact-comparison]` to a page.

### Development

The functionality is implemented as a React/Redux application:

* The source for this is in the `/app` directory.
* The plugin uses the production build which is generated in `/app/dist`.

#### Building the React app

**NOTE:** [Node.js](https://nodejs.org) is required to build the app.

To build for production:

```bash
cd app
npm run build
```

To run in dev mode:

```bash
cd app
npm start
```

#### Packaging the plugin

```bash
./package.sh <version>
```

