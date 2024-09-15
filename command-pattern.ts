type Command = {
  execute(): void;
  undo?: () => void;
};

const Invoker = () => {
  let command: Command[] = [];

  return {
    addCommend: (cmd: Command[]) => {
      command = [...command, ...cmd];
    },
    excute: () => {
      for (const cmd of command) {
        cmd.execute();
      }
    },
    undo: (index: number) => command[index]?.undo?.(),
  };
};

type Post = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
};

const CreatePost = (post: Post) => console.log('createPost', post);
const CreateUndoPost = (post: Post) => console.log('createUndoPost', post);
const CreatePostCommand = (post: Post): Command => {
  return {
    execute() {
      CreatePost(post);
    },
    undo() {
      CreateUndoPost(post);
    },
  };
};

const BatchUpdatePost = (post: Post) => console.log('batchUpdatePost', post);
const BatchUndoPost = (post: Post) => console.log('batchUndoPost', post);
const BatchPostCommand = (post: Post): Command => {
  return {
    execute() {
      BatchUpdatePost(post);
    },
    undo() {
      BatchUndoPost(post);
    },
  };
};

const i = Invoker();
const createPostCommand = CreatePostCommand({
  id: '1',
  description: 'hi',
  imageUrl: 'https://post.co.kr',
  title: 'post title',
});
const batchPostCommand = BatchPostCommand({
  id: '2',
  description: 'hi',
  imageUrl: 'https://post.co.kr',
  title: 'post title',
});

i.addCommend([createPostCommand, batchPostCommand]);
i.excute();
