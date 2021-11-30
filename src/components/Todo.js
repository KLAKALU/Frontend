import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Container,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
  Input,
  ListItemSecondaryAction,
  Checkbox
  } from '@material-ui/core';

export default function MainContainer ()  {
  const [createissue, setCreateissue] = useState("");
  const [issues, setIssues] = useState([]);

  const createIssue = (event) => {
    console.log("イベント発火")
    axios.post('https://thawing-wildwood-48291.herokuapp.com/sured',
      {
        content: createissue
      }
    ).then(response => {
      console.log("registration response", response.data)
      setIssues([...issues, {
        id: response.data.id,
        content: response.data.content
      }])
      resetTextField()
    })
    event.preventDefault()
  }

  useEffect(()  =>  {
    async function fetchData()  {
      const result = await axios.get('https://thawing-wildwood-48291.herokuapp.com/sured',)
        console.log(result)
        console.log(result.data)
        setIssues(result.data);
      }
      fetchData();
      }, []);

  const resetTextField = () => {
    setCreateissue('')
  }

  return (
    <React.Fragment>
      <Container component='main' maxWidth='xs'>
        <CssBaseline/>
          <form onSubmit={createIssue}>
            <Input
                type="text"
                name="content"
                value={createissue}
                placeholder="Enter text"
                onChange={event => setCreateissue(event.target.value)}
            />
            <Button
              type="submit"
              variant='contained'
              color='primary'>
                つぶやく
            </Button>
          </form>
        <List
          style={{marginTop: '48px'}}
          component='ul'
        >
          {issues.map(item => (
            <ListItem key={item.id} component='li' >
              <ListItemText>
                ID:{item.id}
                Name:{item.content}
                Time:{item.created_at}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Container>
    </React.Fragment>
  );
}
