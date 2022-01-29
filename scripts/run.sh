
echo ---------------------------------------------------------
echo "Step 1: Create a game"
echo ---------------------------------------------------------


GAMEID=$(near call $CONTRACT initGame --amount 5 --account_id {NEAR_ACCOUNT} | tail -c 11)
# GAMEID=3693090198

echo $GAMEID 
echo ---------------------------------------------------------
echo "Step 2: Join the game"
echo ---------------------------------------------------------
echo

near call $CONTRACT joinGame '{"gameId": '$GAMEID'}' --amount 3 --accountId {NEAR_ACCOUNT}

echo ---------------------------------------------------------
echo "Step 3: Play the game"
echo ---------------------------------------------------------

near call $CONTRACT playGame '{"gameId":'$GAMEID' , "guess":3 }' --accountId {NEAR_ACCOUNT}

# echo ---------------------------------------------------------
# echo "Step 4: Delete Game (Optional)"
# echo ---------------------------------------------------------
# echo

# near call $CONTRACT deleteGame '{"_gameId":'$GAMEID' }' --accountId {NEAR_ACCOUNT}