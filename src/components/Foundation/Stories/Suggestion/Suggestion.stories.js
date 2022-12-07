import React from 'react';

import { Suggestion } from 'components/Foundation';
import './styles.scss';

const story = {
  title: 'Components/Suggestion',
  component: Suggestion,
};

function Template(args) {
  return (
    <div className="d-flex flex-column">
      <Suggestion className="story-suggestion" search="the" {...args} />
      <Suggestion className="story-suggestion" search="shOUl" hint="bold" {...args} />
      <Suggestion className="story-suggestion" search="ITLE" {...args} />
    </div>
  );
}

export const Primary = Template.bind({});
Primary.args = {
  title: 'There should be some title',
  description: 'Description',
  icon: 'fa-map',
};

export const BoldHighlight = Template.bind({});
BoldHighlight.args = {
  title: 'There should be some title',
  hint: 'bold',
};

export default story;
