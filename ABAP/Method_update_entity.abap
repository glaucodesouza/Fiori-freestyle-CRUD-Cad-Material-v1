  METHOD materialset_update_entity.

  DATA: ls_data   TYPE zcl_zgcad_mat270_mpc=>ts_material,
        ls_key    TYPE /iwbep/s_mgw_name_value_pair,
        lv_bukrs  TYPE bukrs,
        lv_matnr  TYPE matnr.

* Ler dados enviados no payload
  io_data_provider->read_entry_data(
    IMPORTING
      es_data = ls_data ).

* Ler chaves da URL (BUKRS / MATNR)
  LOOP AT it_key_tab INTO ls_key.
    CASE ls_key-name.
      WHEN 'Bukrs'.
        lv_bukrs = ls_key-value.
      WHEN 'Matnr'.
        lv_matnr = ls_key-value.
    ENDCASE.
  ENDLOOP.

* Atualizar tabela
  UPDATE zcad_mat270
     SET maktx = ls_data-maktx
         menge = ls_data-menge
         meins = ls_data-meins
   WHERE bukrs = lv_bukrs
     AND matnr = lv_matnr.

* Verificar se funcionou
  IF sy-subrc <> 0.
    RAISE EXCEPTION TYPE /iwbep/cx_mgw_busi_exception
      EXPORTING
        message = 'Erro ao atualizar registro'.
  ENDIF.

* Retornar dados atualizados
  er_entity = ls_data.

  ENDMETHOD.