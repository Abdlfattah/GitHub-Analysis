import React from 'react'
import moment from 'moment'
import { Icon, Step, Header, Segment } from 'semantic-ui-react'
import style from './style.css'

function TimeLine({commits}) {

  const renderItems = () => (
      commits.map((item,i)=>(
            <Step completed key={i}>
              <Icon name='info' />
              <Step.Content>
                <Step.Title>Commiter: {item.commit.committer.name}}</Step.Title>
                <Step.Description>{moment(item.commit.committer.date).format('MMMM Do YYYY, h:mm:ss a')}</Step.Description>
              </Step.Content>
            </Step>
          )
      )
  )
  return (
    <div className={style.container}>
      <Header textAlign='center' as='h4' icon='clock outline' content='Timeline' />
      {commits.length>0?
        <Segment>
          <div className={style.list}>
            <Step.Group vertical>
                    {renderItems()}
            </Step.Group>
          </div>
        </Segment>
        :null
      }
    </div>
  )
}

export default TimeLine
