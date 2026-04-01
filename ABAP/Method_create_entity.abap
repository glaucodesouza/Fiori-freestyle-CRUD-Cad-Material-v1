  METHOD materialset_create_entity.

*https://www.youtube.com/watch?v=2YbXsOTglrU

    DATA: ls_input_data TYPE zcl_zgcad_mat270_mpc=>ts_material.
    DATA: ls_zcad_mat270 TYPE zcad_mat270.

* Ler os dados enviados pelo Fiori
    io_data_provider->read_entry_data(
      IMPORTING
        es_data = ls_input_data ).

    MOVE-CORRESPONDING ls_input_data TO ls_zcad_mat270.

* Inserir na tabela transparente
    INSERT zcad_mat270 FROM ls_zcad_mat270.

    IF sy-subrc <> 0.
      RAISE EXCEPTION TYPE /iwbep/cx_mgw_busi_exception
        EXPORTING
          textid  = /iwbep/cx_mgw_busi_exception=>business_error
          message = 'Erro ao inserir registro'.
    ENDIF.

  ENDMETHOD.