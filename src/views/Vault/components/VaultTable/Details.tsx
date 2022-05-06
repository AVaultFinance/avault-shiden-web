import React from 'react';
import styled from 'styled-components';
import Loading from 'components/TransactionConfirmationModal/Loading';
import { ArrowIcon } from 'style/SmallBorderPageLayout';

interface DetailsProps {
  actionPanelToggled: boolean;
  isLoading: boolean;
}

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding-right: 8px;
  color: ${({ theme }) => theme.colors.primary};
  width: 48px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: 0px;
  }
`;

const Details: React.FC<DetailsProps> = ({ actionPanelToggled, isLoading }) => {
  return (
    <Container>
      {isLoading ? (
        <Loading isLoading={isLoading} success={true} />
      ) : (
        <ArrowIcon color="primary" toggled={actionPanelToggled} />
      )}
    </Container>
  );
};

export default Details;
