import styled from 'styled-components'

const Wrapper = styled.section`
  margin-top: 4rem;
  text-align: center;
  button {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    color: var(--primary-500);
    font-size: 1.25rem;
    cursor: pointer;

    .charts {
      color: #2E8A99;
    }
    .charts:hover {
      color: #213555;
    }

  }
  h4 {
    text-align: center;
    margin-bottom: 0.75rem;
  }
  
`

export default Wrapper
