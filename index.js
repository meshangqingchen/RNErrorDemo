/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import AppTest from './AppTest';
import PluginTest from './PluginTest';
import {name as appName} from './app.json';
import RRVideoViewer from './RRVideoViewer';
import RRVideoViewerDemo from './RRVideoViewerDemo';

// import * as Sentry from "@sentry/react";
// import { BrowserTracing } from "@sentry/tracing";
// Sentry.init({
//     dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
//     integrations: [new BrowserTracing()],

//     // We recommend adjusting this value in production, or using tracesSampler
//     // for finer control
//     tracesSampleRate: 1.0,
//   });
AppRegistry.registerComponent(appName, () => RRVideoViewerDemo);
