import { log } from "./utils";

/**
 * 기능을 나타내는 최상위 추상 클래스
 */
abstract class Post {
  public title: string = 'New Post';
  public expiredDate: Date | undefined;

  // 데코레이터를 사용하면 반드시 명시해야하는 함수
  hasPermission(): boolean {
    return false;
  }
}

class DefaultPost extends Post {
  constructor() {
    super();
    this.title = 'DefaultPost';
    this.expiredDate = new Date('2030-01-01');
  }
}

class ExpiredPost extends Post {
  constructor() {
    super();
    this.title = 'ExpiredPost';
    this.expiredDate = undefined;
  }
}

/**
 * 최상위 추상 클래스에서 꾸며야 할 부분을 추상 메서드로 정의함
 * 구상 데코레이터 클래스에서는 최상위 추상 클래스를 인스턴스로 받아 그것을 이용하여 추상 메서드를 구현함
 */
abstract class PostDecorator extends Post {
  protected constructor(post: Post) {
    super();
    this.title = post.title;
    this.expiredDate = post.expiredDate;
  }

  abstract hasPermission(): boolean;
}

/**
 * Enable 데코레이터로 감싸면 이름을 변경하면서 기능을 사용 할 수 있도록 함
 */
class ExpiringPermissionValidator extends PostDecorator {
  constructor(post: Post) {
    super(post);
  }

  public hasPermission(): boolean {
    return !!this.expiredDate && new Date() <= this.expiredDate;
  }
}

const defaultPost: Post = new DefaultPost();
const enable: Post = new ExpiringPermissionValidator(defaultPost);

const invalidPost: Post = new ExpiredPost();
const invalid = new ExpiringPermissionValidator(invalidPost);

log('enable post: ', enable.title);
log('enable post: ', enable.hasPermission());
log('invalidPost: ', invalid.title);
log('invalidPost: ', invalid.hasPermission());
