import React from 'react';
import Link from 'next/link';
import { Text, Box, Flex, BoxProps, color, FlexProps } from '@stacks/ui';
import { useColorMode } from '@common/hooks/use-color-mode';

const FooterLink: React.FC<BoxProps & { onClick?: any }> = React.memo(({ children, ...rest }) => (
  <Text
    cursor="pointer"
    textStyle="body.small"
    color={color('text-caption')}
    textDecoration="none"
    css={{
      a: {
        textDecoration: 'none',
        color: 'currentColor',
      },
    }}
    _hover={{ textDecoration: 'underline' }}
    {...rest}
  >
    {children}
  </Text>
));

const ColorModeLink = React.memo(({ ...rest }) => {
  const { toggleColorMode, colorMode } = useColorMode();
  return colorMode ? (
    <FooterLink onClick={toggleColorMode} {...rest}>
      {colorMode === 'light' ? 'Dark mode' : 'Light mode'}
    </FooterLink>
  ) : null;
});

const LinkInNewWindow = React.memo(
  React.forwardRef((props: any, ref: any) => (
    <Text as="a" target="_blank" rel="noopener noreferrer" ref={ref} {...props} />
  ))
);

export const Footer = React.memo(({ fullWidth, ...props }: FlexProps & { fullWidth?: boolean }) => {
  return (
    <Box width="100%" {...props}>
      <Flex
        pt="base"
        flexDir={['column', 'column', 'row']}
        align={['center', 'center', 'unset']}
        textAlign={['center', 'center', 'unset']}
        borderTop="1px solid var(--colors-border)"
        px={fullWidth ? ['base', 'base', 'extra-loose'] : 'unset'}
      >
        <Flex pb={['tight', 'tight', 'unset']} pr={['unset', 'unset', 'base']}>
          <FooterLink mr="base">
            <Link href="/transactions" passHref>
              <Text as="a">Recent transactions</Text>
            </Link>
          </FooterLink>
          <FooterLink mr="base">
            <Link href="/sandbox" passHref>
              <Box as="a">Sandbox</Box>
            </Link>
          </FooterLink>
          <ColorModeLink />
        </Flex>

        <Flex ml={['unset', 'unset', 'auto']}>
          <FooterLink mr="base">
            <LinkInNewWindow href="https://blocksurvey.io/survey/1Pb7eeibpfM98hRKBfMUULYCh9BivxE86q/1128356d-4048-48ca-a456-052ef8c5526e">
              Give feedback
            </LinkInNewWindow>
          </FooterLink>
          <FooterLink mr="base">
            <LinkInNewWindow href="https://www2.blockstack.org/explorer/faq">FAQ</LinkInNewWindow>
          </FooterLink>
          <FooterLink mr="base">
            <LinkInNewWindow href="https://github.com/blockstack/explorer/">GitHub</LinkInNewWindow>
          </FooterLink>
          <FooterLink mr="base">
            <LinkInNewWindow href="https://blockstack.org/legal/privacy-policy">
              Privacy policy
            </LinkInNewWindow>
          </FooterLink>
          <FooterLink>
            <LinkInNewWindow href="https://blockstack.org/legal/terms-of-use">
              Terms
            </LinkInNewWindow>
          </FooterLink>
        </Flex>
      </Flex>
    </Box>
  );
});
