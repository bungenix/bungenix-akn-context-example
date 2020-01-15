import React from 'react';
import JSONPretty from 'react-json-pretty';
import JSONPrettyMon from 'react-json-pretty/dist/monikai';

export const Viewer = ({json}) => 
      <div>
      <JSONPretty id="json-pretty" data={json} theme={JSONPrettyMon}></JSONPretty> 
      </div>
  ;

