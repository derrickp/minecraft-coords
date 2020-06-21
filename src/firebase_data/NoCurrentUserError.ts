export class NoCurrentUserError extends Error {
  name = "NoCurrentUser";
  message = "No user currently signed in";
  stack?: string | undefined;
}
