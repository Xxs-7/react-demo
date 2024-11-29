import React, { ForwardedRef, forwardRef, useImperativeHandle, useRef } from "react";

const AddComment = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref: ForwardedRef<HTMLInputElement>) => {
    return <input placeholder='please input' ref={ref} {...props} />;
  }
);

type CommentListHandle = {
  scrollToBottom: () => void;
};

const CommentList = forwardRef<CommentListHandle, {}>(function CommentList(_, ref?: React.Ref<CommentListHandle>) {
  const divRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      scrollToBottom() {
        if (divRef.current) {
          divRef.current.scrollTop = divRef.current.scrollHeight;
        }
      },
    }),
    []
  );

  const comments = Array.from({ length: 50 }, (_, i) => <p key={i}>Comment #{i}</p>);

  return (
    <div className='h-[100px] overflow-scroll border border-black my-5' ref={divRef}>
      {comments}
    </div>
  );
});

type PostHandle = {
  scrollAndFocusAddComment: () => void;
};

const Post = forwardRef<PostHandle>((_, ref) => {
  const commentsRef = useRef<{ scrollToBottom: () => void } | null>(null);
  const addCommentRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    scrollAndFocusAddComment() {
      commentsRef.current?.scrollToBottom();
      addCommentRef.current?.focus();
    },
  }));

  return (
    <>
      <article>
        <p>Welcome to my blog!</p>
      </article>
      <CommentList ref={commentsRef} />
      <AddComment ref={addCommentRef} />
    </>
  );
});

function RefComp() {
  const postRef = useRef<PostHandle>(null);

  function handleClick() {
    postRef.current?.scrollAndFocusAddComment();
  }

  return (
    <>
      <button onClick={handleClick}>Write a comment</button>
      <Post ref={postRef} />
    </>
  );
}

export default RefComp;
