import { type FormData } from '../models';

export const formFixtures: Partial<FormData>[] = [
  {
    name: "Geralt's Adventures",
    elements: [
      {
        id: '1',
        type: 'text',
        label: 'Witcher Name',
        isRequired: true,
      },
      {
        id: '2',
        type: 'checkbox',
        label: '🍯 Swallow (Healing)',
        isRequired: false,
      },
      {
        id: '3',
        type: 'checkbox',
        label: '🐱 Cat (Night Vision)',
        isRequired: false,
      },
      {
        id: '4',
        type: 'checkbox',
        label: '⚡ Thunderbolt (Attack)',
        isRequired: false,
      },
      {
        id: '5',
        type: 'checkbox',
        label: '🦉 Tawny Owl (Stamina)',
        isRequired: false,
      },
      {
        id: '6',
        type: 'checkbox',
        label: '🔥 Igni Potion (Fire Magic)',
        isRequired: false,
      },
      {
        id: '7',
        type: 'checkbox',
        label: '🧊 Quen Elixir (Shield)',
        isRequired: false,
      },
      {
        id: '8',
        type: 'text',
        label: '💚 Healing warmth flows through you',
        isRequired: false,
        conditionalLogic: {
          operator: 'AND',
          rules: [
            { dependsOn: '2', showWhen: true },
            { dependsOn: '3', showWhen: false },
            { dependsOn: '4', showWhen: false },
          ],
        },
      },
      {
        id: '9',
        type: 'text',
        label: '⚡ Enhanced senses! Describe your power',
        isRequired: false,
        conditionalLogic: {
          operator: 'OR',
          rules: [
            { dependsOn: '3', showWhen: true },
            { dependsOn: '4', showWhen: true },
            { dependsOn: '5', showWhen: true },
          ],
        },
      },
      {
        id: '10',
        type: 'text',
        label: '🔥 Magical fire courses through your veins',
        isRequired: false,
        conditionalLogic: {
          operator: 'AND',
          rules: [
            { dependsOn: '6', showWhen: true },
            { dependsOn: '7', showWhen: false },
          ],
        },
      },
      {
        id: '11',
        type: 'text',
        label: '🛡️ Protected by magical barriers',
        isRequired: false,
        conditionalLogic: {
          operator: 'AND',
          rules: [
            { dependsOn: '7', showWhen: true },
            { dependsOn: '6', showWhen: false },
          ],
        },
      },
      {
        id: '12',
        type: 'checkbox',
        label: '⚠️ Mild toxicity - feeling dizzy',
        isRequired: false,
        conditionalLogic: {
          operator: 'AND',
          rules: [
            { dependsOn: '3', showWhen: true },
            { dependsOn: '4', showWhen: true },
            { dependsOn: '5', showWhen: false },
            { dependsOn: '6', showWhen: false },
          ],
        },
      },
      {
        id: '13',
        type: 'checkbox',
        label: '🤢 Severe toxicity - vomiting blood',
        isRequired: false,
        conditionalLogic: {
          operator: 'OR',
          rules: [
            {
              operator: 'AND',
              rules: [
                { dependsOn: '3', showWhen: true },
                { dependsOn: '4', showWhen: true },
                { dependsOn: '5', showWhen: true },
              ],
            },
            {
              operator: 'AND',
              rules: [
                { dependsOn: '6', showWhen: true },
                { dependsOn: '7', showWhen: true },
              ],
            },
          ],
        },
      },
      {
        id: '14',
        type: 'text',
        label:
          '☠️ DEATH: Your body cannot handle the toxicity. You collapse and die.',
        isRequired: false,
        conditionalLogic: {
          operator: 'AND',
          rules: [
            { dependsOn: '3', showWhen: true },
            { dependsOn: '4', showWhen: true },
            { dependsOn: '5', showWhen: true },
            { dependsOn: '6', showWhen: true },
          ],
        },
      },
      {
        id: '15',
        type: 'text',
        label: '💀 MAGICAL OVERLOAD: Fire and ice tear you apart from within.',
        isRequired: false,
        conditionalLogic: {
          operator: 'AND',
          rules: [
            { dependsOn: '6', showWhen: true },
            { dependsOn: '7', showWhen: true },
            { dependsOn: '4', showWhen: true },
          ],
        },
      },
      {
        id: '16',
        type: 'checkbox',
        label: '🍯 White Honey (Emergency Antidote)',
        isRequired: false,
        conditionalLogic: {
          operator: 'OR',
          rules: [
            { dependsOn: '12', showWhen: true },
            { dependsOn: '13', showWhen: true },
          ],
        },
      },
      {
        id: '17',
        type: 'text',
        label: '✨ Antidote saves you! What lesson did you learn?',
        isRequired: false,
        conditionalLogic: {
          operator: 'AND',
          rules: [
            { dependsOn: '16', showWhen: true },
            { dependsOn: '14', showWhen: false },
            { dependsOn: '15', showWhen: false },
          ],
        },
      },
      {
        id: '18',
        type: 'text',
        label: '🏆 MASTER ALCHEMIST: Perfect balance achieved!',
        isRequired: false,
        conditionalLogic: {
          operator: 'AND',
          rules: [
            { dependsOn: '2', showWhen: true },
            { dependsOn: '12', showWhen: false },
            { dependsOn: '13', showWhen: false },
            { dependsOn: '14', showWhen: false },
            { dependsOn: '15', showWhen: false },
          ],
        },
      },
      {
        id: '19',
        type: 'text',
        label: '⚔️ BATTLE READY: Enhanced but stable. Describe your next hunt.',
        isRequired: false,
        conditionalLogic: {
          operator: 'AND',
          rules: [
            { dependsOn: '9', showWhen: true },
            { dependsOn: '12', showWhen: false },
            { dependsOn: '13', showWhen: false },
          ],
        },
      },
    ],
  },
  {
    name: "Royal Employment Questionnaire - His Majesty's Service",
    elements: [
      {
        id: '1',
        type: 'text',
        label: 'Full Name',
        isRequired: true,
      },
      {
        id: '2',
        type: 'text',
        label: 'Noble Title',
        isRequired: false,
      },
      {
        id: '3',
        type: 'checkbox',
        label: '🇬🇧 British citizen',
        isRequired: true,
      },
      {
        id: '4',
        type: 'checkbox',
        label: '🔒 Security clearance',
        isRequired: false,
      },
      {
        id: '5',
        type: 'text',
        label: 'Clearance level & authority',
        isRequired: true,
        conditionalLogic: {
          operator: 'AND',
          rules: [{ dependsOn: '4', showWhen: true }],
        },
      },
      {
        id: '6',
        type: 'checkbox',
        label: '🏛️ Diplomatic position',
        isRequired: false,
      },
      {
        id: '7',
        type: 'checkbox',
        label: '⚔️ Military position',
        isRequired: false,
      },
      {
        id: '8',
        type: 'checkbox',
        label: '📋 Civil service position',
        isRequired: false,
      },
      {
        id: '9',
        type: 'text',
        label: 'Languages spoken',
        isRequired: true,
        conditionalLogic: {
          operator: 'AND',
          rules: [{ dependsOn: '6', showWhen: true }],
        },
      },
      {
        id: '10',
        type: 'text',
        label: 'Previous postings',
        isRequired: false,
        conditionalLogic: {
          operator: 'AND',
          rules: [{ dependsOn: '6', showWhen: true }],
        },
      },
      {
        id: '11',
        type: 'text',
        label: 'Rank & regiment',
        isRequired: true,
        conditionalLogic: {
          operator: 'AND',
          rules: [{ dependsOn: '7', showWhen: true }],
        },
      },
      {
        id: '12',
        type: 'text',
        label: 'Combat experience',
        isRequired: false,
        conditionalLogic: {
          operator: 'AND',
          rules: [{ dependsOn: '7', showWhen: true }],
        },
      },
      {
        id: '13',
        type: 'text',
        label: 'University degree',
        isRequired: true,
        conditionalLogic: {
          operator: 'AND',
          rules: [{ dependsOn: '8', showWhen: true }],
        },
      },
      {
        id: '14',
        type: 'checkbox',
        label: '🔍 Enhanced vetting required',
        isRequired: false,
        conditionalLogic: {
          operator: 'OR',
          rules: [
            { dependsOn: '6', showWhen: true },
            { dependsOn: '7', showWhen: true },
          ],
        },
      },
      {
        id: '15',
        type: 'text',
        label: 'Vetting reason',
        isRequired: true,
        conditionalLogic: {
          operator: 'AND',
          rules: [{ dependsOn: '14', showWhen: true }],
        },
      },
      {
        id: '16',
        type: 'checkbox',
        label: '👑 Oath of Allegiance',
        isRequired: true,
        conditionalLogic: {
          operator: 'OR',
          rules: [
            { dependsOn: '6', showWhen: true },
            { dependsOn: '7', showWhen: true },
            { dependsOn: '8', showWhen: true },
          ],
        },
      },
      {
        id: '17',
        type: 'text',
        label: '🏰 Eligible! When can you start?',
        isRequired: false,
        conditionalLogic: {
          operator: 'AND',
          rules: [
            { dependsOn: '3', showWhen: true },
            { dependsOn: '16', showWhen: true },
          ],
        },
      },
    ],
  },
  {
    name: 'Newsletter Subscription',
    elements: [
      {
        id: '1',
        type: 'text',
        label: '📧 Email Address',
        isRequired: true,
      },
      {
        id: '2',
        type: 'text',
        label: '👤 First Name',
        isRequired: false,
      },
      {
        id: '3',
        type: 'checkbox',
        label: '💻 Technology news',
        isRequired: false,
      },
      {
        id: '4',
        type: 'checkbox',
        label: '💼 Business updates',
        isRequired: false,
      },
      {
        id: '5',
        type: 'checkbox',
        label: '🌟 Lifestyle content',
        isRequired: false,
      },
      {
        id: '6',
        type: 'checkbox',
        label: '📅 Weekly digest',
        isRequired: false,
        conditionalLogic: {
          operator: 'OR',
          rules: [
            { dependsOn: '3', showWhen: true },
            { dependsOn: '4', showWhen: true },
            { dependsOn: '5', showWhen: true },
          ],
        },
      },
      {
        id: '7',
        type: 'checkbox',
        label: '📰 Daily updates',
        isRequired: false,
        conditionalLogic: {
          operator: 'AND',
          rules: [
            { dependsOn: '3', showWhen: true },
            { dependsOn: '4', showWhen: true },
          ],
        },
      },
      {
        id: '8',
        type: 'text',
        label: 'Specific topics of interest',
        isRequired: false,
        conditionalLogic: {
          operator: 'OR',
          rules: [
            { dependsOn: '6', showWhen: true },
            { dependsOn: '7', showWhen: true },
          ],
        },
      },
      {
        id: '9',
        type: 'checkbox',
        label: '⭐ Premium subscriber',
        isRequired: false,
      },
      {
        id: '10',
        type: 'text',
        label: 'Premium ID',
        isRequired: true,
        conditionalLogic: {
          operator: 'AND',
          rules: [{ dependsOn: '9', showWhen: true }],
        },
      },
      {
        id: '11',
        type: 'checkbox',
        label: '🔔 Premium content alerts',
        isRequired: false,
        conditionalLogic: {
          operator: 'AND',
          rules: [{ dependsOn: '9', showWhen: true }],
        },
      },
      {
        id: '12',
        type: 'checkbox',
        label: '🎁 Promotional offers',
        isRequired: false,
      },
      {
        id: '13',
        type: 'text',
        label: '🎉 Perfect! Best content & offers',
        isRequired: false,
        conditionalLogic: {
          operator: 'AND',
          rules: [
            { dependsOn: '9', showWhen: true },
            { dependsOn: '12', showWhen: true },
          ],
        },
      },
      {
        id: '14',
        type: 'text',
        label: '📧 Thanks! Quality content, no spam',
        isRequired: false,
        conditionalLogic: {
          operator: 'AND',
          rules: [
            { dependsOn: '9', showWhen: false },
            { dependsOn: '12', showWhen: false },
          ],
        },
      },
      {
        id: '15',
        type: 'checkbox',
        label: '✅ Privacy policy & terms',
        isRequired: true,
      },
    ],
  },
];
