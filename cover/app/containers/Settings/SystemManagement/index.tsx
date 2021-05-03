/**
 *
 * Server
 *
 */
import ServiceStatus from 'components/common/ServiceStatus';
import Typography from 'components/common/Type/Typography';
import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Grid } from './styles';

const Layout = styled.div`
  padding: 30px 25px;
  width: 100%;
  overflow-y: auto;
`;

export function SystemManagement() {
  return (
    <Layout>
      <Helmet>
        <title>System Management - Pluteum</title>
      </Helmet>
      <Typography type="SectionTitle">System Management</Typography>
      <Grid>
        <div>
          <Typography type="Paragraph">Storage Details</Typography>
        </div>
        <div>
          <Typography type="Paragraph">Service Details</Typography>
          <ServiceStatus service="Monocle" status={false} />
          <ServiceStatus service="Mailroom" status={false} />
        </div>
      </Grid>
    </Layout>
  );
}

export default SystemManagement;
