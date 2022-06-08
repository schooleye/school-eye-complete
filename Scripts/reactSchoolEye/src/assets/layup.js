import { mathTopics, physicsTopics, chemistryTopics } from './topics';
import {
  mathSubTopics,
  physicsSubTopics,
  chemistrySubTopics,
} from './subtopics';

const topics = [
  {
    subject: 'math',
    topics: [
      mathTopics.map((topic, index) => { 
        return {
          title: topic,
          topicCoverage: 0,

          subTopics: [...mathSubTopics[index]],
        };
      }),
    ],
  },
  {
    subject: 'physics',
    topics: [
      physicsTopics.map((topic, index) => {
        return {
          title: topic,
          topicCoverage: 0,

          subTopics: [...physicsSubTopics[index]],
        };
      }),
    ],
  },
  {
    subject: 'chemistry',
    topics: [
      chemistryTopics.map((topic, index) => {
        return {
          title: topic,
          topicCoverage: 0,

          subTopics: [...chemistrySubTopics[index]],
        };
      }),
    ],
  },
];
export default topics;
