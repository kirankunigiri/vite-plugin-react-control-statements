import { useState } from 'react'

function App() {
	const [ifTestValue, setIfTestValue] = useState(false);
	const [chooseTestValue, setChooseTestValue] = useState(1)

	return (
			<div style={{display: 'flex', flexDirection: 'column'}}>

				{/* If Block Test*/}
				<div>
					<h3>If Block Test</h3>
					<p style={{color: 'gray', marginBottom: '10px'}}>Click on the button to toggle the if condition.</p>

					{/* On/Off toggle - also an example of a choose block*/}
					<button onClick={() => setIfTestValue((value) => !value)}>
						<Choose>
							<When condition={ifTestValue}>On</When>
							<Otherwise>Off</Otherwise>
						</Choose>
					</button>

					{/* If condition result */}
					<If condition={ifTestValue}>
						<span style={{marginLeft: '10px'}}></span>
						<span>The if condition is true.</span>
					</If>
				</div>

				{/* Divider */}
				<hr/>

				{/* Choose Block Test*/}
				<div>
					<h3>Choose/When/Otherwise Block Test</h3>
					<p style={{color: 'gray', marginBottom: '10px'}}>Move the slider between 1 and 10</p>

					{/* Slider*/}
					<span style={{marginRight: '10px', fontWeight: 'bold'}}>{chooseTestValue}</span>
					<input type="range" min="1" max="10" value={chooseTestValue} className="slider"
						   onChange={(event) => setChooseTestValue(parseInt(event.target.value))}
					/>

					{/* Choose/When/Otherwise Block */}
					<Choose>
						<When condition={chooseTestValue === 1}>
							<p>When: Slider value is 1</p>
						</When>
						<When condition={chooseTestValue === 2}>
							<p>When: Slider value is 2</p>
						</When>
						<Otherwise>
							<p>Otherwise: Slider is above 2</p>
						</Otherwise>
					</Choose>
				</div>
			</div>
	)
}

export default App
