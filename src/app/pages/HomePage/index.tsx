import { Helmet } from 'react-helmet-async';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useSlice } from './slice';
import { select } from './slice/selectors';

export function HomePage() {
  const dispatch = useDispatch();
  const { actions } = useSlice();
  useEffect(() => {
    dispatch(actions.loadCatFact());
  }, [actions, dispatch]);
  const { catFact, error, loading } = useSelector(select);
  const handleClick = useCallback(() => {
    dispatch(actions.loadCatFact());
  }, [dispatch, actions]);

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <Wrapper>
        <Content>
          <Title>CAT FACT</Title>
          {loading ? (
            <Text>LOADING...</Text>
          ) : (
            <Text>
              {error ? <Text>TRY AGAIN.</Text> : <Text>{catFact}</Text>}
            </Text>
          )}
        <Button onClick={handleClick}>Refresh</Button>
        </Content>

      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 320px;
  box-sizing: border-box;
`;

const Title = styled.h3`
  width: 100%;
  font-weight: 700;
  margin: 0;
  margin-bottom: 10px;
  border-bottom: 2px dotted black;
  text-align: center;
`;

const Content = styled.div`
  display: flex;
  height: 15rem;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
  max-width: 80%;
  border: 2px solid black;
  border-radius: 7px;
  padding: 10px;
`;

const Text = styled.span`
  color: black;
  font-family: 'Courier New', Courier, monospace;
  overflow-y: auto;
  margin-bottom: 10px;
  text-align: center;
`;

const Button = styled.button`
  background-color: #800080;
  color: white;
  width: 100%;
  min-height: 30px;
  border: none;
  border-radius: 3px;
  outline: none;
`;

