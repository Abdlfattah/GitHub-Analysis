import React from 'react'
import { Header, Feed, Segment } from 'semantic-ui-react'

import style from './style.css'

function Committers({committers,commits}) {

    const renderCommitters = (items,commits) => (
        items.map((item,i)=>{
            let counter=0;
             
            let c=0
            while(c<commits.length){
                let nameCommitter=commits[c].committer?commits[c].committer.login:commits[c].commit.committer.name
                if(nameCommitter===item.author.login){
                    counter++
                }
                c++
            }
           
            return <Feed.Event key={i}>
                        <Feed.Label image={item.author.avatar_url} />
                        <Feed.Content>
                        <Feed.Date content={item.author.login} />
                        <Feed.Summary>
                            <Feed.User>Total commits:{<b>{counter}</b>}</Feed.User>
                        </Feed.Summary>
                        </Feed.Content>
                    </Feed.Event>
        }))
    return (
        <div className={style.container}>
            <Header as='h4' icon='user' content='Committers with their contributions based on last 100 commits' />
            {committers.length>0 && commits.length>0?
                <Segment textAlign='center'>
                    <div className={style.list}>
                        <Feed >
                            {renderCommitters(committers,commits)}
                        </Feed>
                    </div> 
                </Segment>
                :null
            }       
        </div>
    )
}

export default Committers
