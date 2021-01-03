import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import {Headlines} from '../queries'
import client from '../apolloClient'
import { Card, Row, Col, Anchor } from 'antd'



const BBC = () => {
  const { Meta } = Card;
  const { Link } = Anchor;
  const [articles, setArticles] = useState([])
  useEffect(() => {
    requestHeadlines()
  }, [])

  console.log('articles', articles)
  const {loading, error, data} = useQuery(Headlines)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  console.log('data', data)
  
  const requestHeadlines = () => {
    client
    .query({
      query: Headlines
    })
    .then(response => {
      setArticles(response.data.headlines.articles)
    })
    .catch(error => {
      console.log('ERROR ==>', error)
    })
  }



  return (
  <div>
    <Row gutter={[16, 16]}>
      {articles.map(item => {
        const {title, description, publishedAt, url, urlToImage, content, name} = item
      
      return (
        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <Card
            hoverable
            style={{ width: '100%' }}
            >
            <img src={urlToImage} className="thumbnail"/>
            <Meta title={title}
            description={description} 
            />
            <p>{publishedAt.substring(0, 10)}</p> 
            
          </Card>
        </Col>
      )
     })}
    </Row>
  </div>
  )
}

export default BBC