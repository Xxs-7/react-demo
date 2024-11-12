import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

// 初始状态
const initialCommentState = {
  comments: [],
}

// 创建 slice
const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialCommentState,
  reducers: {
    addComment: (state, action) => {
      state.comments.push({
        id: Date.now(),
        text: action.payload,
        replies: [],
      })
    },
    addReply: (state, action) => {
      console.log('action.payload', action.payload)
      const { commentId, reply } = action.payload
      console.log('commentId', commentId)
      console.log('reply', reply)
      const comment = state.comments.find((comment) => comment.id === commentId)
      if (comment) {
        comment.replies.push(reply)
      }
    },
  },
})

export const { addComment, addReply } = commentsSlice.actions

const store = configureStore({
  reducer: {
    comments: commentsSlice.reducer,
  },
})

const ReplyList = ({ commentId, replies }) => {
  const dispatch = useDispatch()
  const [newReply, setNewReply] = useState('')

  const handleAddReply = () => {
    if (newReply.trim()) {
      console.log('newReply', newReply)
      dispatch(addReply({ commentId, reply: newReply }))
      setNewReply('')
    }
  }

  return (
    <div className='ml-6 mt-4'>
      <ul className='space-y-2'>
        {replies.map((reply, index) => (
          <li key={index} className=' p-2 rounded shadow'>
            {reply}
          </li>
        ))}
      </ul>
      <div className='add-reply mt-2 flex'>
        <input
          type='text'
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          placeholder='回复'
          className='flex-grow p-2 border border-gray-300 rounded mr-2'
        />
        <button
          onClick={handleAddReply}
          className='p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600'
        >
          添加回复
        </button>
      </div>
    </div>
  )
}

const Comments = () => {
  const comments = useSelector((state) => state.comments.comments)

  const dispatch = useDispatch()
  const [newComment, setNewComment] = useState('')

  const handleAddComment = () => {
    if (newComment.trim()) {
      dispatch(addComment(newComment))
      setNewComment('')
    }
  }

  console.log('comments', comments)

  return (
    <div className='comments-section w-96 mx-auto my-8'>
      <h3 className='text-xl font-semibold mb-4'>评论区</h3>
      <div className='add-comment mt-4 flex'>
        <input
          type='text'
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder='输入你的评论'
          className='flex-grow p-2 border border-gray-300 rounded mr-2'
        />
        <button
          onClick={handleAddComment}
          className='p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600'
        >
          添加评论
        </button>
      </div>
      <ul className='space-y-4'>
        {comments &&
          comments.map((comment) => (
            <li key={comment.id} className=' p-4 rounded shadow'>
              {comment.text}
              <ReplyList commentId={comment.id} replies={comment.replies} />
            </li>
          ))}
      </ul>
    </div>
  )
}

const CommentDemo = () => {
  return (
    <Provider store={store}>
      <div className='text-center w-screen h-screen'>
        <h1 className='text-3xl font-bold my-8'>抖音评论区</h1>
        <Comments />
      </div>
    </Provider>
  )
}

export default CommentDemo
