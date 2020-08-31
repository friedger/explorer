import React from 'react';
import NextLink from 'next/link';
import { Box, BoxProps, Flex, FlexProps, BlockstackIcon } from '@stacks/ui';
import { Link } from '@components/typography';
import { TestnetSelector } from '@components/testnet-selector';
import { SearchBarWithDropdown } from '@components/search-bar';
import { ColorModeButton } from '@components/color-mode-button';

type HeaderTextItemProps = BoxProps & Partial<React.AnchorHTMLAttributes<HTMLAnchorElement>>;

export const HeaderTextItem = React.forwardRef((props: HeaderTextItemProps, ref) => (
  <Link as="a" fontSize="14px" fontWeight={500} ref={ref} {...props} />
));

export const LogoNavItem = React.memo((props: BoxProps) => (
  <Box flexShrink={0} {...props}>
    <NextLink href="/" passHref>
      <a aria-label="Homepage" title="Stacks Explorer">
        <BlockstackIcon color="var(--colors-invert)" size="24px" />
      </a>
    </NextLink>
  </Box>
));

const HeaderBar: React.FC<FlexProps> = React.memo(props => (
  <Box position="fixed" zIndex={999} top={0} width="100%">
    <Flex
      zIndex={9999}
      height="64px"
      alignItems="center"
      flexDirection="row"
      bg="var(--colors-bg)"
      borderBottom="1px solid"
      borderColor="var(--colors-border)"
      boxShadow="0px 1px 2px rgba(27, 39, 51, 0.04), 0px 4px 8px rgba(27, 39, 51, 0.04)"
      px={['base', 'base', 'extra-loose']}
      position="relative"
      {...props}
    />
  </Box>
));

export const Header: React.FC<{ isHome?: boolean; fullWidth?: boolean } & FlexProps> = React.memo(
  ({ isHome, fullWidth, ...props }) => (
    <HeaderBar justifyContent={isHome ? 'space-between' : 'unset'} {...props}>
      <LogoNavItem mr="base" />
      <Flex
        mx={['none', 'none', 'auto']}
        width="100%"
        justifyContent={isHome || fullWidth ? 'space-between' : 'unset'}
        pl={['unset', 'unset', 'base-loose']}
        pr={isHome || fullWidth ? 'unset' : ['unset', 'unset', '52px']}
        maxWidth={isHome || fullWidth ? 'unset' : '1280px'}
        align="center"
      >
        {!isHome ? (
          <SearchBarWithDropdown
            boxProps={{
              transform: ['none', 'none', 'translateX(-11px)'],
            }}
            small
            height="40px"
            maxWidth={['100%', '100%', '544px']}
          />
        ) : null}
        <Box ml="auto" pl="base" />
        <ColorModeButton mr="tight" />
        <NextLink href="/transactions" passHref>
          <HeaderTextItem mr="base">Transactions</HeaderTextItem>
        </NextLink>
        <NextLink href="/sandbox" passHref>
          <HeaderTextItem>Sandbox</HeaderTextItem>
        </NextLink>
        <TestnetSelector display={['none', 'none', 'block']} pl="base" />
      </Flex>
    </HeaderBar>
  )
);
