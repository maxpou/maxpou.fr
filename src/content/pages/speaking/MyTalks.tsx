import React, { type JSX } from 'preact'

import { presentations, talks, trainingsAndWorkshops } from '../../talks'

function Talks(): JSX.Element {
  return (
    <ul>
      {talks.map(talk => (
        <li>
          <a href={talk.link} target="_blank" rel="noopener noreferrer">
            {talk.title}
          </a>
          <ul>
            {talk.events.map(event => (
              <li>
                {'🗓 '}
                {event.date}, {event.eventName} — {event.city}
                {event.link && (
                  <>
                    {' — '}
                    <a href={event.link.url}>{event.link.label}</a>
                  </>
                )}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}

function TrainingsAndWorkshops(): JSX.Element {
  return (
    <ul>
      {trainingsAndWorkshops.map(educational => (
        <li>
          <a href={educational.url} target="_blank" rel="noopener noreferrer">
            {educational.title}
          </a>
          {educational.details && <span> — {educational.details}</span>}
          {educational.event && (
            <ul>
              <li>
                🗓 {educational.event.date} {educational.event.city}
              </li>
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}

function Presentations(): JSX.Element {
  return (
    <ul>
      {presentations.map(presentation => (
        <li>
          <a href={presentation.url} target="_blank" rel="noopener noreferrer">
            {presentation.title}
          </a>
          {presentation.details && <span> — {presentation.details}</span>}
        </li>
      ))}
    </ul>
  )
}

export { Talks, TrainingsAndWorkshops, Presentations }
