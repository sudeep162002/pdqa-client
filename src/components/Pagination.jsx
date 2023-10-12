import React, { useEffect } from 'react'
import { PaginationItem, Pagination } from '@material-ui/lab'
import { Link } from 'react-router-dom'
import useStyles from './styles1.js'
import { useDispatch, useSelector } from 'react-redux' // useSelector is used for select something from states.
import { getPosts } from '../actions/posts.js'
// pagination will be going to react component we call it paginate

const Paginate = ({ page }) => {
  //   console.log('In page')
  const { NumberOfPage } = useSelector((state) => state.posts)
  //   console.log(NumberOfPage)
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    if (page) dispatch(getPosts(page))
  }, [page])

  return (
    <Pagination
      className={{ ul: classes.ul }}
      count={NumberOfPage}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/post?page=${item.page}`}
        />
      )}
    />
  )
}

export default Paginate
