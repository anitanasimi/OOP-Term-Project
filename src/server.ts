import App from "./App";
import PostController from "./areas/post/controllers/post.controller";
import LandingController from "./areas/landing/controllers/Landing.controller";
import AuthenticationController from "./areas/authentication/controllers/Authentication.controller";
import { MockAuthenticationService } from "./areas/authentication/services/Authentication.service.mock";
import { AuthenticationService } from "./areas/authentication/services/Authentication.service"
import { PostService, MockPostService } from "./areas/post/services";
import DiscoveryController from "./areas/discovery/controllers/discovery.controller";
import DiscoveryService from "./areas/discovery/services/Discovery.service";

const server = new App([
  new LandingController(),
  new PostController(new MockPostService()),
  new DiscoveryController(new DiscoveryService),
  new AuthenticationController(new AuthenticationService()),
]);

server.start();
