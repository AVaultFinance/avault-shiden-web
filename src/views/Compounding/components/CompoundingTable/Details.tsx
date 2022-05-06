import React from 'react';
import styled from 'styled-components';
import { ChevronDownIcon } from '@avault/ui';

interface DetailsProps {
  actionPanelToggled: boolean;
}

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding-right: 8px;
  color: ${({ theme }) => theme.colors.primary};

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: 0px;
  }
`;

export const ArrowIcon = styled(ChevronDownIcon)<{ toggled: boolean }>`
  transform: ${({ toggled }) => (toggled ? 'rotate(180deg)' : 'rotate(0)')};
  width: 24px;
`;

const Details: React.FC<DetailsProps> = ({ actionPanelToggled }) => {
  return (
    <Container>
      <ArrowIcon color="primary" toggled={actionPanelToggled} />
    </Container>
  );
};

export default Details;
