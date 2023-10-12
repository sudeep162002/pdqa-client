import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'

import useStyles from './style.js'
import { createPost, updatePost } from '../../actions/posts.js'

// Get the current id of post.

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  })

  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null,
  )

  useEffect(() => {
    if (post) setPostData(post)
  }, [post])

  const dispatch = useDispatch()
  const classes = useStyles()
  const user = JSON.parse(localStorage.getItem('profile'))

  const handlesubmit = (e) => {
    e.preventDefault()
    console.log('form is succesfully submited')

    if (currentId) {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }))
    } else {
      console.log('form is going to dispatched')
      dispatch(createPost({ ...postData, name: user?.result?.name }))
      console.log('form is succesfully dispatched')
    }
    clear()
  }

  const clear = () => {
    setCurrentId(null)
    setPostData({
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    })
  }

  if (!user?.result?.name) {
    return (
      <paper className={classes.paper}>
        <Typography variant="h6" align="center">
          please sign in to creater your own Interview experience and like other's experience
        </Typography>
      </paper>
    )
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root}${classes.form}`}
        onSubmit={handlesubmit}
      >
        <Typography variant="h6">
          {currentId ? 'Editing' : 'Creating'} a Memory
        </Typography>

        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth="true"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Experience"
          fullWidth="true"
          multiline
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth="true"
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />

        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth="true"
        >
          submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullwidth="true"
        >
          clear
        </Button>
      </form>
    </Paper>
  )
}

export default Form
