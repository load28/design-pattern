import { log } from './utils';

// Types
type Post = {
  title: string;
  expiredDate: Date | undefined;
};

// Functions
const createPost = (title: string, expiredDate?: Date): Post => ({
  title,
  expiredDate,
});

const hasPermission = (post: Post): boolean => {
  return !!post.expiredDate && new Date() <= post.expiredDate;
};

// Factory functions
const createDefaultPost = (): Post => createPost("DefaultPost", new Date("2030-01-01"));

const createExpiredPost = (): Post => createPost("ExpiredPost", undefined);

// Decorator function
const withExpiringPermissionValidator = (post: Post): Post & { hasPermission: () => boolean } => ({
  ...post,
  hasPermission: () => hasPermission(post),
});

// Usage
const defaultPost = createDefaultPost();
const enable = withExpiringPermissionValidator(defaultPost);

const invalidPost = createExpiredPost();
const invalid = withExpiringPermissionValidator(invalidPost);

log("enable post: ", enable.title);
log("enable post: ", enable.hasPermission());
log("invalidPost: ", invalid.title);
log("invalidPost: ", invalid.hasPermission());
