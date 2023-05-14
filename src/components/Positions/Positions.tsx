import React, { useState, useEffect } from 'react';
import { getPositions } from '../../api/positions';
import { Position } from '../../types/Position';

import './Positions.scss';

type Props = {
  positionId: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Positions: React.FC<Props> = ({
  positionId,
  handleChange,
}) => {
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const positionsFromServer = await getPositions();

        setPositions(positionsFromServer.positions);
      } catch (error) {
        Promise.reject(new Error('error'));
      }
    })();
  }, [])

  return (
    <div className="positions">
      <div>Select your position</div>

      {positions.map(pos => (
        <label key={pos.id}>
          <input
            type="radio"
            name="position"
            value={pos.id}
            checked={positionId === String(pos.id)}
            onChange={handleChange}
          />

          {pos.name}
        </label>
      ))}
    </div>
  );
};
