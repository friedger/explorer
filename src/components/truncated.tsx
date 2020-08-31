import * as React from 'react';
import { css } from '@styled-system/css';
import { Box, Flex } from '@stacks/ui';
import { color } from '@components/color-modes';
import { truncateMiddle } from '@common/utils';
import { useClickOutside } from 'use-events';

export const Truncate = React.memo(({ children, offset = 8 }: any) => {
  const [selected, setSelected] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  const handleDoubleClick = React.useCallback(() => {
    setSelected(true);
  }, []);

  useClickOutside([ref], () => setSelected(false));
  return (
    <Flex
      css={css({
        '*::selection': {
          color: 'transparent !important',
        },
      })}
    >
      <Box ref={ref} onDoubleClick={handleDoubleClick} position="relative" overflow="hidden">
        <Box
          style={{
            userSelect: 'none',
            pointerEvents: 'none',
            color: selected ? 'white' : undefined,
          }}
          position="relative"
          zIndex={1}
        >
          {truncateMiddle(children, offset)}
        </Box>
        <Box
          color="transparent"
          style={{ wordBreak: 'keep-all' }}
          position="absolute"
          left={0}
          top={0}
        >
          {children}
        </Box>
      </Box>
    </Flex>
  );
});
