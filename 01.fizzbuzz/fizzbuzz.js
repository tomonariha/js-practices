for( let number = 1; number <= 20; number++ ) {
  if( number % 15 == 0 ) {
    console.log( 'fizzbuzz' );
  } else if( number % 3 == 0 ) {
    console.log( 'fizz' );
  } else if( number % 5 == 0 ) {
    console.log( 'buzz' );
  } else {
    console.log( number );
  }
}
