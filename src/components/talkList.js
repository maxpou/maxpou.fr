import styled from 'styled-components'

export const List = styled.ul`
  list-style: none;
  padding-left: 0;
`

export const Item = styled.li`
  margin-bottom: 10px;
`

export const Link = styled.a``

export const Event = styled.em`
  margin-left: 10px;
  display: block;
`

export const Media = styled.a`
  border-bottom: 1px dotted rgba(162, 162, 162, 0.8);
  font-style: normal;
`

export default {
  List,
  Item,
  Link,
  Event,
  Media,
}
