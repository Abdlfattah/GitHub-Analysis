import React from 'react'
import {Card, Image, Header } from 'semantic-ui-react'
import style from './style.css'

function CardComp({repo}) {
    return (
        <div className={style.container}>
          <Header as='h4' icon='plug' content='The repository' />
          {repo?
            <div> 
                <Card>
                    <Card.Content>
                        <Image floated='right' size='mini' src={repo.owner.avatar_url} />
                        <Card.Header>{repo.name}</Card.Header>
                        <Card.Meta>{repo.owner.login}</Card.Meta>
                        <Card.Description>
                        {repo.description}
                        </Card.Description>
                    </Card.Content>
                </Card>
            </div>
            :null
            }
        </div>
    )
}

export default CardComp
