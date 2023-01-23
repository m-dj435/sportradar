import { Message, Icon } from "semantic-ui-react";

const Alert = ({ icon, text, subText, headerClassNames, ...otherProps }) => (
  <Message {...otherProps} icon={!!icon}>
    {icon && <Icon name={icon} />}
    <Message.Content>
      <Message.Header className={headerClassNames}>
        {text + " " + subText}
      </Message.Header>
    </Message.Content>
  </Message>
);

export default Alert;
