import React from 'react';

import { MatchedText, Title, Text } from 'components/Foundation';

const story = {
  title: 'Components/MatchedText',
  component: MatchedText,
};

export function TextChildren(args) {
  return (
    <div>
      <MatchedText match="Here IS matched text" {...args}>
        <Text>
          Lorem ipsum dolor sit amet, here is matched text. Expedita, vitae.
        </Text>
      </MatchedText>
    </div>
  );
}

export function TitleChildren(args) {
  return (
    <MatchedText {...args} match="matched TexT">
      <Title font="bold" size={18} color="gray-dark">
        Here is matched text, rendered inside Title component.
      </Title>
    </MatchedText>
  );
}

export default story;
