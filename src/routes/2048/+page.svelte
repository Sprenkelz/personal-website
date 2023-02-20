<script lang="ts">

	import { Game } from './game';
	
	let game: Game = new Game;
	let board: Array<Array<number>> = game.gameArray;
	let gameOver: boolean = false;
	let won: boolean = false;
	

	function keydown(event: KeyboardEvent) {

		game.doMove(event.key);
		board = game.gameArray;

		if (game.numFilled === 16) {
			if (game.lost()) {
				won = false;
				gameOver = true;
			}
		}
		if (game.won) {
			won = true;
			gameOver = true;
		}
	}

	function restartGame() {
		game.restart();
		board = game.gameArray;
		gameOver = false;
		won = false;
	}

</script>

<svelte:window on:keydown={keydown} />

<div class="game">
	<p>
		Use WASD to play.
	</p>
	<div class="grid">
		{#each Array(4) as _, row}
			<div class="row">
				{#each Array(4) as _, col}
					<div class="col">
						{board[row][col] === 0 ? "" : board[row][col]}
					</div>
				{/each}
			</div>
		{/each}
	</div>
	{#if gameOver}
	<p>
		{won ? "You won!" : "Game over :("}
	</p>
	<button on:click={restartGame}>
		Play again?
	</button>
	{/if}
</div>

<style>
	.game {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		flex: 1;
	}

	.grid {
		--width: 600px;
		max-width: var(--width);
		align-self: center;
		justify-self: center;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.grid .row {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-gap: 0.2rem;
		margin: 0 0 0.2rem 0;
	}

	.grid .col {
		aspect-ratio: 1;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		box-sizing: border-box;
		text-transform: lowercase;
		border: 2px solid black;
		font-size: calc(0.15 * var(--width));
		font-weight: bolder;
		border-radius: 10px;
		background: white;
		margin: 0;
		color: rgba(0, 0, 0, 0.7);
	}

</style>
