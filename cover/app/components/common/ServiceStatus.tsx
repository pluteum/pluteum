import React from 'react';
import styled from 'styled-components';
import PropType from 'prop-types';

const StatusLine: any = styled.span`
  display: block;

  font-family: 'IBM Plex Sans', 'Open Sans', 'Helvetica Neue', Helvetica, Arial,
    sans-serif;
  font-weight: lighter;
  font-size: 16px;
  color: ${props => props.theme.colors.darkGrey};

  background: ${props => props.theme.colors.lightGrey};

  margin: 10px 0;
  padding: 10px 16px;

  border-radius: 16px;

  &:before {
    content: '';
    display: inline-block;

    width: 8px;
    height: 8px;

    border-radius: 100%;

    margin-right: 16px;

    position: relative;
    bottom: 2px;

    background: ${(props: any) =>
      props.status ? props.theme.colors.primary : props.theme.colors.red};
  }
`;

export default function ServiceStatus({ status, service }) {
  return <StatusLine status={status}>{service}</StatusLine>;
}

ServiceStatus.propTypes = {
  status: PropType.bool,
  service: PropType.string,
};
